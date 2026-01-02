import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
  LMS_ISSUER,
  LMS_CLIENT_ID,
  TOOL_LAUNCH_URI,
  TOOL_LOGIN_ENDPOINT
} from '$env/static/private';

export const POST: RequestHandler = async ({ request, cookies }) => {
  // 서버에서 설정값 가져오기
  const issuer = LMS_ISSUER;
  const clientId = LMS_CLIENT_ID;
  const targetLinkUri = TOOL_LAUNCH_URI;

  // 실제 LMS에서는 세션에서 사용자 정보 가져옴
  // 여기서는 테스트용으로 쿠키 또는 mock 데이터 사용
  const userId = cookies.get('lms_user_id') || 'test-user-' + Date.now();
  const loginHint = userId;

  // 선택적 파라미터 (폼에서 받을 수도 있음)
  const formData = await request.formData();
  const ltiMessageHint = formData.get('ltiMessageHint')?.toString();
  const courseId = formData.get('courseId')?.toString();
  const resourceId = formData.get('resourceId')?.toString();

  // LTI 1.3 OIDC Login Initiation
  // Tool의 login endpoint로 리다이렉트
  const loginUrl = new URL(TOOL_LOGIN_ENDPOINT);

  loginUrl.searchParams.set('iss', issuer);
  loginUrl.searchParams.set('login_hint', loginHint);
  loginUrl.searchParams.set('target_link_uri', targetLinkUri);
  loginUrl.searchParams.set('client_id', clientId);

  if (ltiMessageHint) {
    loginUrl.searchParams.set('lti_message_hint', ltiMessageHint);
  }

  // 추가 컨텍스트 정보 (선택적)
  if (courseId) {
    loginUrl.searchParams.set('lti_deployment_id', courseId);
  }

  console.log('LMS launching tool:', {
    issuer,
    clientId,
    loginHint,
    targetLinkUri,
    url: loginUrl.toString()
  });

  // 사용자 ID 쿠키 저장 (실제로는 세션 사용)
  cookies.set('lms_user_id', userId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 1 day
  });

  // Tool로 리다이렉트 (서버 사이드)
  throw redirect(302, loginUrl.toString());
};
