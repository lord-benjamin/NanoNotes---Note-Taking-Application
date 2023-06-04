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
                    createdAt: -1
                }
            },
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            // {
            //     $project: {
            //         title: {$substr:["$title",0,30]},
            //         content: {$substr:["$content",0,100]}
            //     }
            // }
        ])
        .skip((notesPerPage*pageNo) - notesPerPage)
        .limit(notesPerPage)
        .exec();

        const totalNotes =  await Note.count();
        const lastPage = Math.ceil(totalNotes/notesPerPage);
        if(pageNo > lastPage){
            res.status(404).render("404",{
                btnContent: "Go to Dashboard",
                url: "/dashboard",
                layout: "../views/layouts/404-layout.ejs"
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