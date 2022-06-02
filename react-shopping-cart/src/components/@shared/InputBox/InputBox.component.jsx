import FlexBox from '../FlexBox/FlexBox.component';
import Input from '../Input/Input.component';
import TextBox from '../TextBox/TextBox.component';

function InputBox({ error, label, errorMessage, ...attribute }) {
  return (
    <FlexBox width="100%" gap="5px" direction="column">
      <TextBox fontSize="small" as="label">
        {label}
      </TextBox>
      <Input {...attribute} error={error} />
      {error && (
        <TextBox fontSize="extraSmall" color="RED_001">
          {errorMessage}
        </TextBox>
      )}
    </FlexBox>
  );
}

export default InputBox;
