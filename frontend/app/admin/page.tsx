import { checkAuth, getProjects, getMessages } from "@/lib/actions";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
    const auth = await checkAuth();

    if (!auth.isAuth) {
        redirect("/");
    }

    const projects = await getProjects();
    const messages = await getMessages();

    return (
        <AdminDashboard
            initialProjects={projects}
            initialMessages={messages}
            role={auth.role} // Pasamos el rol
        />
    );
}