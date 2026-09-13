import './ActionPanel.css'

/**
 * 작업 패널 / 등록 패널 / 기능 패널 공통 컴포넌트.
 * size='lg'는 주 조작용 큰 타일, size='sm'은 보조 기능 버튼이다.
 */
export default function ActionPanel({ title, sub, size = 'lg', actions }) {
  return (
    <section className="card apanel" aria-label={title}>
      <div className="card__head">
        <h2 className="card__title">{title}</h2>
        {sub ? <span className="card__sub">{sub}</span> : null}
      </div>

      <div className={`apanel__grid apanel__grid--${size}`}>
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            className={`abtn abtn--${a.tone ?? 'plain'}`}
            onClick={a.onClick}
            disabled={a.disabled}
          >
            <span className="abtn__label">{a.label}</span>
            {a.hint ? <span className="abtn__hint num">{a.hint}</span> : null}
          </button>
        ))}
      </div>
    </section>
  )
}
