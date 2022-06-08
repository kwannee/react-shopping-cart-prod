import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ArrowButton from 'components/@shared/ArrowButton/ArrowButton.component';
import Button from 'components/@shared/Button/Button.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import InputBox from 'components/@shared/InputBox/InputBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import { setSnackBarMessage } from 'redux/actions/snackbar.action';
import {
  setEmail,
  setPassword,
  setPasswordCheck,
  setEmailDisabled,
} from 'redux/actions/userInfo.action';

import useValidateEmail from 'hooks/api/auth/useValidateEmail';

import { enterSubmit } from 'utils';

function LoginInfoContainer({ onClickPrev, onSubmit, userInfoButtonText }) {
  const dispatch = useDispatch();
  const { checkValidEmail } = useValidateEmail();
  const { email, password, passwordCheck } = useSelector(state => state.userInfo);

  const submitDisabled =
    !email.value.length ||
    email.error ||
    !email.disabled ||
    !password.value.length ||
    password.error ||
    !passwordCheck.value.length ||
    passwordCheck.error;

  const handleCheckDuplicatedEmail = async e => {
    e.preventDefault();

    try {
      await checkValidEmail({ email: email.value });
      dispatch(setEmailDisabled(true));
    } catch (error) {
      dispatch(setSnackBarMessage('중복인 이메일입니다.'));
    }
  };

  return (
    <FlexBox
      onKeyDown={e => {
        enterSubmit(e, submitDisabled, onSubmit);
      }}
      id="loginInfo"
      width="100%"
      direction="column"
      gap="10px"
    >
      <FlexBox
        onKeyDown={e => {
          enterSubmit(e, email.disabled || email.error || email.value == '', () =>
            handleCheckDuplicatedEmail(e)
          );
        }}
        alignItems="flex-start"
        gap="10px"
        height="90px"
      >
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
          <FlexBox height="100%" alignItems="center">
            <Button
              width="100px"
              height="50px"
              borderRadius="10px"
              padding="10px"
              mt="10px"
              onClick={handleCheckDuplicatedEmail}
              disabled={email.disabled || email.error || email.value == ''}
            >
              <TextBox fontSize="extraSmall" color="WHITE_001">
                중복 확인
              </TextBox>
            </Button>
          </FlexBox>
        )}
      </FlexBox>
      <PasswordInputBox>
        <InputBox
          {...password}
          onChange={e => {
            dispatch(setPassword(e.target.value));
          }}
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          errorMessage="8자리 이상 16자리 이하 숫자, 소문자, 대문자, 특수문자를 조합하여 비밀번호를 입력해 주세요."
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
      </PasswordInputBox>
      <FlexBox as="button" gap="5px" onClick={onClickPrev}>
        <ArrowButton direction="left" />
        <TextBox fontSize="small">이전</TextBox>
      </FlexBox>
      <Button disabled={submitDisabled} onClick={onSubmit} width="100%" borderRadius="10px">
        <TextBox color="WHITE_001">{userInfoButtonText}</TextBox>
      </Button>
    </FlexBox>
  );
}

export default LoginInfoContainer;

const PasswordInputBox = styled(FlexBox).attrs({
  direction: 'column',
  gap: '10px',
})`
  height: 220px;
`;
