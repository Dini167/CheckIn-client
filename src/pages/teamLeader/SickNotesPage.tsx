import useFetch from "../../hooks/useFetch";
import { getTeamSickNotes } from "../../api/sickNotesApi";
import type { SickNote } from "../../types/sickNote";
import SickNoteItem from "../../components/attendance/SickNoteItem";

export default function SickNotesPage() {
    const { data: sickNotes, isLoading, error, refetch } = useFetch<SickNote[]>(getTeamSickNotes, "שגיאה בטעינת אישורי המחלה", ["teamSickNotes"]);

    return (
        <div className="page">
            <h1 className="page-title">אישורי מחלה</h1>
            {isLoading && <p className="loading">טוען...</p>}
            {error && <p className="alert alert-danger py-2">{error}</p>}
            {!isLoading && !error && (sickNotes && sickNotes.length > 0
                ? sickNotes.map((sickNote) => (
                    <SickNoteItem key={sickNote.id} sickNote={sickNote} onReviewed={() => { refetch(); }} />
                ))
                : <p className="empty-state">אין אישורי מחלה שממתינים לאישור</p>)}
        </div>
    );
}
