import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArrowButton from 'components/@shared/ArrowButton/ArrowButton.component';
import Button from 'components/@shared/Button/Button.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import InputBox from 'components/@shared/InputBox/InputBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import {
  setEmail,
  setPassword,
  setPasswordCheck,
  setEmailDisabled,
} from 'redux/actions/userInfo.action';

import useFetch from 'hooks/useFetch';

function LoginInfoContainer({ onClickPrev, onSubmit, userInfoButtonText }) {
  const dispatch = useDispatch();
  const { fetchData: checkDuplicatedEmail, data } = useFetch({
    url: '/customers/email',
    method: 'post',
    skip: true,
  });
  const { email, password, passwordCheck } = useSelector(state => state.userInfo);
  const isDuplicatedEmail = data?.isValidEmail;

  const handleCheckDuplicatedEmail = async () => {
    await checkDuplicatedEmail(email.value);
    dispatch(setEmailDisabled(true));
  };

  useEffect(() => {
    if (isDuplicatedEmail) {
      alert('중복된 이메일입니다.');
      dispatch(setEmailDisabled(false));
      return;
    }
  }, [data, isDuplicatedEmail]);

  const handlePostUserInfo = () => {};

  return (
    <FlexBox id="loginInfo" width="100%" direction="column" gap="10px">
      <FlexBox alignItems="center" gap="10px">
        <InputBox
          {...email}
          onChange={e => {
            dispatch(setEmail(e.target.value));
          }}
          label="이메일"
          type="email"
          placeholder="이메일"
          errorMessage="이메일 형식을 지켜주세요."
        />
        {!email.disabled && (
          <Button
            width="100px"
            height="50px"
            borderRadius="10px"
            padding="10px"
            onClick={handleCheckDuplicatedEmail}
            disabled={email.disabled || email.error || email.value == ''}
          >
            <TextBox fontSize="extraSmall" color="WHITE_001">
              중복 확인
            </TextBox>
          </Button>
        )}
      </FlexBox>
      <InputBox
        {...password}
        onChange={e => {
          dispatch(setPassword(e.target.value));
        }}
        label="비밀번호"
        type="password"
        placeholder="비밀번호"
        errorMessage="8자리 이상 16자리 이하 소문자, 대문자, 특수문자를 조합하여 비밀번호를 입력해 주세요."
      />
      <InputBox
        {...passwordCheck}
        onChange={e => {
          dispatch(setPasswordCheck(e.target.value));
        }}
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 확인"
        errorMessage="비밀번호가 일치하지 않습니다."
      />
      <FlexBox as="button" gap="5px" onClick={onClickPrev}>
        <ArrowButton direction="left" />
        <TextBox fontSize="small">이전</TextBox>
      </FlexBox>
      <Button onClick={onSubmit} width="100%" borderRadius="10px">
        <TextBox color="WHITE_001">{userInfoButtonText}</TextBox>
      </Button>
    </FlexBox>
  );
}

export default LoginInfoContainer;
