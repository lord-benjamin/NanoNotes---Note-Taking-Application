const Note = require("../models/Note.js");
const mongoose = require("mongoose");

/*******
 * GET /
 * Dashboard*
 *******/

exports.dashboard = async(req,res)=>{
    const notesPerPage = 12;
    let pageNo = req.query.page || 1;

    const locals = {
        title: "Dashboard - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }

    try{
        const allNotes = await Note.aggregate([
            {
                $sort: {
                    updatedAt: -1
                }
            },
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
        ])
        .skip((notesPerPage*pageNo) - notesPerPage)
        .limit(notesPerPage)
        .exec();

        const totalNotes =  await Note.count();
        const lastPage = Math.ceil(totalNotes/notesPerPage);
        if(pageNo>lastPage && totalNotes>0){
            res.status(404).render("404",{
                locals: {title: "404 - Not Found"},
                btnContent: "Go to Dashboard",
                url: "/dashboard",
                layout: "../views/layouts/error-layout.ejs"
            });
        }
        else{
            res.render("dashboard/main-dashboard",{
                profileImage: req.user.profileImage,
                userName: req.user.firstName,
                locals,
                allNotes,
                currentPage: pageNo,
                totalPages: lastPage,
                layout: "../views/layouts/dashboard-layout.ejs"
            });
        }
    }
    catch(error){
        console.log(error);
    }
}

/*******
 * GET /
 * View Note*
 *******/

exports.viewNote = async(req,res)=>{
    const note = await Note.findById({_id: req.params.id})
    .where({user: req.user.id})
    .lean();

    const locals = {
        title: "Note - " + (note.title.length>50 ? note.title.substr(0,50)+"..." : note.title) + " - NanoNotes",
        description: note.content.length>100 ? note.content.substr(0,100)+"..." : note.content,
    }

    if(note){
        res.render("dashboard/view-note",{
            profileImage: req.user.profileImage,
            noteId: req.params.id,
            locals,
            note,
            layout: "../views/layouts/dashboard-layout.ejs"
        });
    }
    else{
        res.status(404).render("404",{
            locals: {title: "404 - Not Found"},
            btnContent: "Go to Dashboard",
            url: "/dashboard",
            layout: "../views/layouts/error-layout.ejs"
        });
    }
}

/*******
 * PUT /
 * Update Note*
 *******/

exports.updateNote = async(req,res)=>{
    try{
        await Note.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                content: req.body.content,
                updatedAt: Date.now() + 19800000
            },
        )
        .where({user: req.user.id});
        res.redirect("/dashboard")
    }
    catch(error){
        console.log(error);
    }
}

/*******
 * DELETE /
 * Delete Note*
 *******/

exports.deleteNote = async(req,res)=>{
    try{
        await Note.deleteOne({_id: req.params.id}).where({user: req.user.id});
        res.redirect("/dashboard");
    }
    catch(error){
        console.log(error);
    }
}

/*******
 * GET /
 * Add Note*
 *******/

exports.addNotePage = async(req,res)=>{
    const locals = {
        title: "Add Note - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    res.render("dashboard/add-note",{
        profileImage: req.user.profileImage,
        locals,
        layout: "../views/layouts/dashboard-layout.ejs"
    })
}

/*******
 * POST /
 * Add Note*
 *******/

exports.addNote = async(req,res)=>{
    try{
        const newNote = new Note({
            user: req.user.id,
            title: req.body.title,
            content: req.body.content,
        });
        await newNote.save();
        res.redirect("/dashboard");
    }
    catch(error){
        console.log(error);
    }
}

/*******
 * GET /
 * Search Note*
 *******/

exports.searchNotePage = async(req,res)=>{
    const locals = {
        title: "Search Results - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    try{
        res.render("dashboard/search-note",{
            profileImage: req.user.profileImage,
            locals,
            searchResults: '',
            layout: "../views/layouts/dashboard-layout.ejs"
        })
    }
    catch(error){
        console.log(error);
    }
}

/*******
 * POST /
 * Search Note*
 *******/

exports.searchNote = async(req,res)=>{
    const locals = {
        title: "Search Results - NanoNotes",
        description: "NanoNotes is a sleek and powerful note-taking application that seamlessly captures and organizes your thoughts, ideas, and inspirations. Elevate your note-taking experience with NanoNotes and unlock the potential of enhanced organization, searchability, and productivity.",
    }
    try{
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g,"");
        const searchResults = await Note.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecialChars,'i')}},
                {content: {$regex: new RegExp(searchNoSpecialChars,'i')}},
            ]
        })
        .where({user: req.user.id});
        res.render("dashboard/search-note",{
            profileImage: req.user.profileImage,
            locals,
            searchResults,
            layout: "../views/layouts/dashboard-layout.ejs"
        })
    }
    catch(error){
        console.log(error);
    }
}
