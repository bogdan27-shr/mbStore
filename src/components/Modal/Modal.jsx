import './Modal.scss';

export default function Modal({
  isOpen,
  type = 'success',
  title,
  message,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={`modal modal--${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <div className="modal__icon" aria-hidden="true">
          {type === 'success' ? '✓' : type === 'error' ? '!' : 'i'}
        </div>

        <h2 className="modal__title" id="modal-title">
          {title}
        </h2>

        <p className="modal__message">{message}</p>

        {children}

        <button
          className="modal__button"
          type="button"
          onClick={onClose}
        >
          CONTINUE
        </button>
      </section>
    </div>
  );
}