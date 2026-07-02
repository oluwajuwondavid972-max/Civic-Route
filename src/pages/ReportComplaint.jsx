import { useEffect, useRef, useState } from "react";
import { submitComplaint } from "../services/api";
import { CATEGORIES, WARDS } from "../data/constants";
import TicketConfirmation from "../components/TicketConfirmation";
import styles from "./ReportComplaint.module.css";

/**
 * Citizen Portal — the public face of Civic Route.
 * Mobile-first: a big text area (with optional voice dictation),
 * a ward selector, an optional category, and one clear action.
 */
function ReportComplaint() {
  const [text, setText] = useState("");
  const [ward, setWard] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState(null);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const SpeechRecognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  const toggleVoice = () => {
    if (!SpeechRecognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-NG";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (text.trim().length < 15) {
      setError("Please describe the issue in a little more detail (at least a sentence).");
      return;
    }
    if (!ward) {
      setError("Select your ward so the council knows where the issue is.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitComplaint({
        raw_text: text.trim(),
        ward,
        category: category || undefined,
      });
      setTicket(result);
    } catch (err) {
      setError("Something went wrong sending your complaint. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setTicket(null);
    setText("");
    setWard("");
    setCategory("");
  };

  if (ticket) {
    return (
      <main className={styles.page}>
        <TicketConfirmation complaint={ticket} onReset={handleReset} />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Your Local Government Council is listening</p>
        <h1 className={styles.headline}>
          Say it once.
          <br />
          <span className={styles.headlineAccent}>It reaches the right desk.</span>
        </h1>
        <p className={styles.lede}>
          Describe the problem in your own words — broken transformer, dry tap,
          blocked drain. Our AI router reads it, tags the location and urgency,
          and sends it straight to the council department that can fix it.
        </p>
      </section>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="complaint-text" className={styles.label}>
            What is the problem?
          </label>
          <div className={styles.textareaWrap}>
            <textarea
              id="complaint-text"
              className={styles.textarea}
              rows={6}
              maxLength={1000}
              placeholder="e.g. The transformer near the community market on Herbert Macaulay Way burst last night, we don't have light."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            {SpeechRecognition && (
              <button
                type="button"
                className={`${styles.voiceBtn} ${listening ? styles.voiceActive : ""}`}
                onClick={toggleVoice}
                aria-pressed={listening}
              >
                <span aria-hidden="true">{listening ? "◼" : "🎙"}</span>
                {listening ? "Stop recording" : "Speak instead"}
              </button>
            )}
          </div>
          <p className={styles.hint}>{text.length}/1000 characters</p>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="ward" className={styles.label}>
              Your ward
            </label>
            <select
              id="ward"
              className={styles.select}
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              required
            >
              <option value="">Select your ward…</option>
              {WARDS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="category" className={styles.label}>
              Category <span className={styles.optional}>(optional — the AI can decide)</span>
            </label>
            <select
              id="category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Let the AI decide</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? "Routing your complaint…" : "Send to my council"}
        </button>

        <p className={styles.privacyNote}>
          No account needed. Your report goes only to your Local Government
          Council.
        </p>
      </form>
    </main>
  );
}

export default ReportComplaint;
