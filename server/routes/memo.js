// Memo 라우터 만들기
import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/* 
    WRITE MEMO: POST /api/memo
    BODY SAMPLE: { contents: "sample "}
*/
router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === "undefined"){
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== "string"){
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });   
    }

    // CREATE NEW MEMO
    let memo = new Memo({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    })

    // SAVE IN DATABASE
    memo.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });

});

/*
    MODIFY MEMO: PUT /api/memo/:id
    BODY SAMPLE: { contents: "sample "}
*/
router.put('/:id', (req, res) => {
    
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND MEMO
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        // IF MEMO DOES NOT EXIST
        if(!memo){
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if(memo.writer != req.session.loginInfo.username){
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;

        memo.save((err, memo) => {
            if(err) throw err;
            return res.json({ success: true, memo });
        });

    });
});

/*
    DELETE MEMO: DELETE /api/memo/:id
*/
router.delete('/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === "undefined"){
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND MEMO AND CHECK FOR WRITER
    Memo.findById(req.params.id, (err, memo) => {
        if(err) throw err;

        if(!memo){
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        if(memo.writer != req.session.loginInfo.username){
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE MEMO
        Memo.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });

});


/*
    READ MEMO: GET /api/memo
*/
router.get('/', (req, res) => {
    Memo.find()
    .sort({"_id": -1})
    .limit(6)
    .exec((err, memos) => { 
        // what's the exec?
        // -> Every model method that accepts query conditions can be executed 
        //    by means of a callback or the exec method.
        if(err) throw err;
        res.json(memos)
    })
});

// 지금으로서는, 작성된 메모들을 최신부터 오래된것 순서로 6개만 읽어옴.

// 나중에, 무한 스크롤링을 구현 할 때는, 특정 _id 보다 낮은 메모 6개 읽기,
// 새로운 메모를 읽어올 때에는, 특정 _id 보다 높은 메모읽기,
// 그리고 유저를 검색할 때 사용 될 특정 유저의 메모 읽기 기능을 구현 할 것

/*
    READ ADDITIONAL (OLD/NEW) MEMO: GET /api/memo/:listType/:id
*/
router.get('/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if(listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if(listType === 'new') {
        // GET NEWER MEMO
        Memo.find({ _id: { $gt: objId }}) // objId 보다 큰 값을 조회해
        .sort({ _id: -1 }) // 내림차순으로 정렬하고
        .limit(6) // 6개만 보여지게 하고
        .exec((err, memos) => { // Used callback
            if (err) throw err;
            return res.json(memos)
        })
    } else {
        // GET OLDER MEMO
        Memo.find({ _id: { $lt: objId }})
        .sort({ _id: -1 })
        .limit(6)
        .exec((err, memos) => {
            if(err) throw err;
            return res.json(memos)
        })
    }
})

export default router;
