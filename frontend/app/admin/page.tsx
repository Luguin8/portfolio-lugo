import { checkAuth, getProjects, getMessages, getBoardData, getVisitStats } from "@/lib/actions";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
    const auth = await checkAuth();

    if (!auth.isAuth) {
        redirect("/");
    }

    const projects = await getProjects();
    const messages = await getMessages();
    // getBoardData()/getVisitStats() themselves return empty for demo role —
    // fetched here too so they never even round-trip for a demo viewer.
    const board = auth.role === 'admin' ? await getBoardData() : { notes: [], postits: [], scratch: "" };
    const visitStats = auth.role === 'admin' ? await getVisitStats() : { total: 0, byCountry: [] };

    return (
        <AdminDashboard
            initialProjects={projects}
            initialMessages={messages}
            initialBoard={board}
            initialVisitStats={visitStats}
            role={auth.role} // Pasamos el rol
        />
    );
}