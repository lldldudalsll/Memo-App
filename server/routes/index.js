// API 루트 라우터 생성
import express from 'express';
import account from './account';
// API 라우터에 Memo 라우터 추가 
import memo from './memo';

const router = express.Router();
router.use('/account', account);
router.use('/memo', memo)

// memo 라우터를 api 라우터에서 사용하도록 합시다. 
// 이제 /api/memo 에다가 GET / POST / PUT / DELETE 등 메소드로 요청을 할 수 있습니다

export default router;