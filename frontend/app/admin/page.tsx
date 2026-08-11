import { checkAuth, getMessages, getBoardData, getVisitStats, getPayments } from "@/lib/actions";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
    const auth = await checkAuth();

    if (!auth.isAuth) {
        redirect("/");
    }

    const messages = await getMessages();
    // getBoardData()/getVisitStats()/getPayments() themselves return empty
    // for demo role — fetched here too so they never even round-trip for a
    // demo viewer.
    const board = auth.role === 'admin' ? await getBoardData() : { notes: [], postits: [], scratch: "" };
    const visitStats = auth.role === 'admin' ? await getVisitStats() : { total: 0, byCountry: [] };
    const payments = auth.role === 'admin' ? await getPayments() : [];

    return (
        <AdminDashboard
            initialMessages={messages}
            initialBoard={board}
            initialVisitStats={visitStats}
            initialPayments={payments}
            role={auth.role} // Pasamos el rol
        />
    );
}