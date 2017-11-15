// 회원가입 / 로그인 / 현재세션체크 API 를 담당할 account 라우터 입니다
import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
})

router.post('/signin', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
});

router.get('/getinfo', (req, res) => {
    res.json({ info: null });
})

router.post('/logout', (req, res) => {
    res.json({ success: true });
})

export default router;
