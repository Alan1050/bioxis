import { useEffect, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import educationLogo from '../assets/WebP/division-educativa.webp'
import engineeringLogo from '../assets/WebP/division-ingenieria.webp'
import medicineLogo from '../assets/WebP/division-medicina.webp'
import { collaboratorsByLanguage } from '../data/collaborators'
import type { AreaId, CollaboratorProfile } from '../data/collaborators'
import { useLanguage } from '../i18n/LanguageContext'

const areaVisuals: Record<AreaId, { logo: string; accent: string }> = {
  medicine: { logo: medicineLogo, accent: '#c68cff' },
  engineering: { logo: engineeringLogo, accent: '#61caff' },
  outreach: { logo: educationLogo, accent: '#ffd84d' },
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

type InterestCarouselProps = {
  interests: readonly string[]
  label: string
  previousLabel: string
  nextLabel: string
  pauseLabel: string
  playLabel: string
}

const InterestCarousel = ({
  interests,
  label,
  previousLabel,
  nextLabel,
  pauseLabel,
  playLabel,
}: InterestCarouselProps) => {
  const prefersReducedMotion =
    typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(prefersReducedMotion)
  const [isInteracting, setIsInteracting] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion)
  const isCarousel = interests.length > 1

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      setReduceMotion(mediaQuery.matches)
      if (mediaQuery.matches) setIsPaused(true)
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  useEffect(() => {
    if (!isCarousel || isPaused || isInteracting || reduceMotion) return

    const interval = window.setInterval(() => {
      if (document.hidden) return
      setCurrentIndex((current) => (current + 1) % interests.length)
    }, 3600)

    return () => window.clearInterval(interval)
  }, [interests.length, isCarousel, isInteracting, isPaused, reduceMotion])

  const moveCarousel = (direction: -1 | 1) => {
    setCurrentIndex((current) => (current + direction + interests.length) % interests.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isCarousel || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
    event.preventDefault()
    moveCarousel(event.key === 'ArrowLeft' ? -1 : 1)
  }

  return (
    <div
      className={`interest-carousel${isCarousel ? '' : ' interest-carousel-static'}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={isCarousel ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => setIsInteracting(true)}
      onPointerLeave={() => setIsInteracting(false)}
      onFocus={() => setIsInteracting(true)}
      onBlur={() => setIsInteracting(false)}
    >
      {isCarousel && (
        <button
          className="interest-carousel-control interest-carousel-previous"
          type="button"
          onClick={() => moveCarousel(-1)}
          aria-label={previousLabel}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      <div className="interest-carousel-viewport">
        <ul
          className="interest-list"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live={isPaused || reduceMotion ? 'polite' : 'off'}
        >
          {interests.map((interest, index) => (
            <li
              key={interest}
              aria-hidden={index !== currentIndex}
              aria-label={`${index + 1} / ${interests.length}: ${interest}`}
            >
              <span>{interest}</span>
            </li>
          ))}
        </ul>
      </div>

      {isCarousel && (
        <button
          className="interest-carousel-control interest-carousel-next"
          type="button"
          onClick={() => moveCarousel(1)}
          aria-label={nextLabel}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      {isCarousel && (
        <div className="interest-carousel-status">
          <span aria-hidden="true">
            {String(currentIndex + 1).padStart(2, '0')} / {String(interests.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => setIsPaused((current) => !current)}
            aria-label={isPaused ? playLabel : pauseLabel}
            aria-pressed={isPaused}
          >
            {isPaused ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
                <path d="m9 7 8 5-8 5Z" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
                <path d="M9 7v10M15 7v10" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

const CollaboratorsSection = () => {
  const { copy, language } = useLanguage()
  const { bioxisLeader, areas } = collaboratorsByLanguage[language]

  const renderCollaborator = (
    collaborator: CollaboratorProfile,
    areaId: AreaId | 'bioxis',
    isBioxisLeader = false,
  ) => (
    <article
      className={`collaborator-card${isBioxisLeader || collaborator.isAreaLeader ? ' collaborator-card-leader' : ''}${collaborator.isPlaceholder ? ' collaborator-card-placeholder' : ''}`}
      key={collaborator.id}
      role="listitem"
    >
      <div className="collaborator-identity">
        {collaborator.photoUrl ? (
          <img
            className="collaborator-photo"
            src={collaborator.photoUrl}
            alt={`${copy.collaborators.photoAlt} ${collaborator.name}`}
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="collaborator-photo collaborator-photo-placeholder"
            role="img"
            aria-label={`${copy.collaborators.photoAlt} ${collaborator.name}`}
          >
            {getInitials(collaborator.name)}
          </div>
        )}

        <div className="collaborator-identity-copy">
          <span className="collaborator-name-label">{copy.collaborators.fullName}</span>
          <h4>{collaborator.name}</h4>
          <p className="collaborator-specialty">
            <span>{copy.collaborators.specialty}</span>
            {collaborator.specialty}
          </p>
          <div className="collaborator-card-topline">
            <span className="collaborator-role">
              {isBioxisLeader
                ? copy.collaborators.leader
                : collaborator.isAreaLeader
                  ? copy.collaborators.areaLeader
                  : copy.collaborators.member}
            </span>
          </div>
        </div>
      </div>

      <section
        className="collaborator-interests"
        aria-labelledby={`${areaId}-${collaborator.id}-interests`}
      >
        <h5 id={`${areaId}-${collaborator.id}-interests`}>{copy.collaborators.interests}</h5>
        <InterestCarousel
          key={`${language}-${collaborator.id}`}
          interests={collaborator.interests}
          label={`${copy.collaborators.interestCarousel} ${collaborator.name}`}
          previousLabel={copy.collaborators.previousInterest}
          nextLabel={copy.collaborators.nextInterest}
          pauseLabel={copy.collaborators.pauseInterests}
          playLabel={copy.collaborators.playInterests}
        />
      </section>

      <section className="collaborator-biography">
        <h5>{copy.collaborators.biography}</h5>
        <p>{collaborator.biography}</p>
      </section>

      <footer className="collaborator-card-footer">
        {collaborator.profileUrl ? (
          <a
            className="collaborator-profile-button"
            href={collaborator.profileUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${copy.collaborators.openProfile} ${collaborator.name}`}
          >
            {copy.collaborators.profile}
            <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        ) : (
          <span className="collaborator-profile-button is-disabled" aria-disabled="true">
            {copy.collaborators.profilePending}
          </span>
        )}
      </footer>
    </article>
  )

  return (
    <section
      className="content-section collaborators-section"
      id="tripulacion-bioxis"
      aria-labelledby="collaborators-title"
    >
      <div className="section-heading collaborators-heading">
        <p className="eyebrow">{copy.collaborators.eyebrow}</p>
        <h2 id="collaborators-title">{copy.collaborators.title}</h2>
        <p>{copy.collaborators.description}</p>
      </div>

      <div
        className="division-block"
        style={{ '--division-accent': '#79e7ff', marginTop: '42px' } as CSSProperties}
      >
        <div className="division-team-heading">
          <span>{copy.collaborators.leader}</span>
          <span aria-hidden="true">01</span>
        </div>
        <div
          className="division-team-grid"
          role="list"
          style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}
        >
          {renderCollaborator(bioxisLeader, 'bioxis', true)}
        </div>
      </div>

      <nav className="division-jump-nav" aria-label={copy.collaborators.divisionNavAria}>
        {areas.map((area) => (
          <a
            href={`#division-${area.id}`}
            key={area.id}
            style={{ '--division-accent': areaVisuals[area.id].accent } as CSSProperties}
          >
            <span aria-hidden="true" />
            {area.name}
          </a>
        ))}
      </nav>

      <div className="divisions-list">
        {areas.map((area, areaIndex) => {
          const visual = areaVisuals[area.id]
          const titleId = `division-${area.id}-title`

          return (
            <section
              className={`division-block division-${area.id}`}
              id={`division-${area.id}`}
              aria-labelledby={titleId}
              key={area.id}
              style={{ '--division-accent': visual.accent } as CSSProperties}
            >
              <div className={`division-header${areaIndex % 2 === 1 ? ' division-header-reverse' : ''}`}>
                <div className="division-heading-copy">
                  <p>{copy.collaborators.divisionKicker}</p>
                  <h3 id={titleId}>{area.name}</h3>
                  <p>{area.summary}</p>
                </div>

                <div className="division-logo-panel">
                  <img
                    src={visual.logo}
                    alt={area.logoAlt}
                    width="1000"
                    height="1000"
                    loading={areaIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </div>

              <div className="division-team-heading">
                <span>{copy.collaborators.team}</span>
                <span aria-hidden="true">{String(area.people.length).padStart(2, '0')}</span>
              </div>

              <div
                className={`division-team-grid division-team-grid-${Math.min(area.people.length, 3)}`}
                role="list"
              >
                {area.people.map((collaborator) =>
                  renderCollaborator(collaborator, area.id),
                )}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}

export default CollaboratorsSection
