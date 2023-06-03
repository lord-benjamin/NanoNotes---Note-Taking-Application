/*******
 * GET /
 * Homepage*
 *******/

exports.home = async(req,res)=>{
    const locals = {
        title: "NanoNotes - Note Taking Application",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    res.render("home",locals);
}

/*******
 * GET /
 * Features*
 *******/

exports.features = async(req,res)=>{
    const locals = {
        title: "Features - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    res.render("features",locals);
}

/*******
 * GET /
 * FAQs*
 *******/

exports.faqs = async(req,res)=>{
    const locals = {
        title: "FAQs - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    res.render("faqs",locals);
}

/*******
 * GET /
 * About*
 *******/

exports.about = async(req,res)=>{
    const locals = {
        title: "About - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    res.render("about",locals);
}