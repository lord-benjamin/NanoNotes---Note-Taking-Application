/*******
 * GET /
 * Dashboard*
 *******/

exports.dashboard = async(req,res)=>{
    const locals = {
        title: "Dashboard - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    res.render("dashboard/main-dashboard",{
        locals,
        layout: "../views/layouts/dashboard-layout.ejs"
    });
}