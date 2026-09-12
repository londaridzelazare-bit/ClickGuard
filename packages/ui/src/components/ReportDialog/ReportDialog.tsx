import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "../Button/Button";
import { Modal, ModalSuccess } from "../Modal/Modal";
import { TextArea } from "../TextArea/TextArea";
import "./ReportDialog.css";

export type ReportPhase = "form" | "sent";

export interface ReportDialogProps {
  open: boolean;
  /** The thing being reported — rendered so the user can confirm the target. */
  subject: ReactNode;
  subjectLabel?: string;
  /** Receives the trimmed reason, which may be an empty string. */
  onSubmit(reason: string): void;
  onClose(): void;

  title?: string;
  intro?: ReactNode;
  reasonLabel?: string;
  reasonHint?: ReactNode;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
  successTitle?: string;
  successBody?: ReactNode;
  /** Storybook uses this to document the confirmation state directly. */
  initialPhase?: ReportPhase;
}

/**
 * "Report a mistake" — a one-field form in a modal.
 *
 * The reason is genuinely optional and there is no separate "skip" path:
 * Submit is always enabled, and sending an empty reason is a valid report.
 * A disabled Submit would turn a goodwill gesture into a chore, and most
 * useful signal here is simply *that* a customer disagreed, not why.
 *
 * Focus trapping, Escape and focus restoration come from `Modal`.
 */
export function ReportDialog({
  open,
  subject,
  subjectLabel = "Reporting",
  onSubmit,
  onClose,
  title = "Report a mistake",
  intro = "Tell us we got this one wrong. We review every report and use it to tune the rules on your account.",
  reasonLabel = "What did we get wrong?",
  reasonHint = "A sentence is plenty. You can also send this empty — we'll still review the decision.",
  placeholder = "e.g. This is our office VPN, not a bot.",
  submitLabel = "Submit report",
  cancelLabel = "Cancel",
  successTitle = "Report sent",
  successBody = "Thanks — we'll review this decision and use it to tune your account. Nothing changes for this visitor right now.",
  initialPhase = "form",
}: ReportDialogProps) {
  const [reason, setReason] = useState("");
  const [phase, setPhase] = useState<ReportPhase>(initialPhase);
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  /* A fresh form every time it opens — a leftover reason from the last
     visitor would silently attach to this one. */
  useEffect(() => {
    if (!open) return;
    setReason("");
    setPhase(initialPhase);
  }, [open, initialPhase, subject]);

  function submit() {
    onSubmit(reason.trim());
    setPhase("sent");
  }

  if (phase === "sent") {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title={title}
        footer={
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        }
      >
        <ModalSuccess title={successTitle}>{successBody}</ModalSuccess>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="md"
      initialFocusRef={reasonRef}
      footerAlign="split"
      footer={
        <>
          <span className="cg-report__note">
            {reason.trim() ? "Reason included" : "No reason needed"}
          </span>
          <span style={{ display: "flex", gap: "var(--cg-space-8)" }}>
            <Button onClick={onClose}>{cancelLabel}</Button>
            <Button variant="primary" onClick={submit}>
              {submitLabel}
            </Button>
          </span>
        </>
      }
    >
      <div className="cg-report__subject">
        <span className="cg-report__subject-label">{subjectLabel}</span>
        <span className="cg-report__subject-value">{subject}</span>
      </div>

      <p className="cg-report__intro">{intro}</p>

      <TextArea
        ref={reasonRef}
        label={reasonLabel}
        optional
        hint={reasonHint}
        value={reason}
        onValueChange={setReason}
        placeholder={placeholder}
        maxLength={400}
        rows={4}
      />
    </Modal>
  );
}
