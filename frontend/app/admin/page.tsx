import { checkAuth, getProjects, getMessages, getPrivateNotes } from "@/lib/actions";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
    const auth = await checkAuth();

    if (!auth.isAuth) {
        redirect("/");
    }

    const projects = await getProjects();
    const messages = await getMessages();
    // getPrivateNotes() itself returns [] for demo role — fetched here too
    // so it never even round-trips for a demo viewer.
    const notes = auth.role === 'admin' ? await getPrivateNotes() : [];

    return (
        <AdminDashboard
            initialProjects={projects}
            initialMessages={messages}
            initialNotes={notes}
            role={auth.role} // Pasamos el rol
        />
    );
}