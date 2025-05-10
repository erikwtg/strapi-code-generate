import React from 'react';
import { Stack, TextInput, Button } from '@strapi/design-system';

const generateHex = () => Math.random().toString(16).substring(2, 8).toUpperCase();

interface InputCodeGeneratorProps {
  name: string;
  value: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  intlLabel?: { defaultMessage: string };
  description?: { defaultMessage: string };
}

const InputCodeGenerator = ({
  name,
  value,
  onChange,
  intlLabel,
  description,
}: InputCodeGeneratorProps) => {
  const handleGenerate = () => {
    const hex = generateHex();
    onChange({ target: { name, value: hex } });
  };

  return (
    <Stack spacing={2}>
      <TextInput
        name={name}
        label={intlLabel?.defaultMessage || 'Hex Code'}
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ target: { name, value: e.target.value } })
        }
        description={description?.defaultMessage}
      />
      <Button onClick={handleGenerate}>Generate</Button>
    </Stack>
  );
};

export default InputCodeGenerator;
