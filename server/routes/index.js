// api 루트 라우터 생성
import express from 'express';
import account from './account';

const router = express.Router();
router.use('/account', account);

// 지금은 루트 라우터에서 account 라우터만 불러와서 사용하지만
// 나중에는 메모를 담당하는 memo 라우터도 불러와서 사용하게 됩니다

export default router;