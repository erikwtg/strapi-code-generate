import * as React from 'react';
import { useIntl } from 'react-intl';
import styled, { DefaultTheme } from 'styled-components';
import { ArrowClockwise, Duplicate } from '@strapi/icons';
import { Field, TextInput, useComposedRefs } from '@strapi/design-system';
import { FieldValue, InputProps, useFocusInputField } from '@strapi/strapi/admin';

declare module 'styled-components' {
  interface DefaultTheme {
    colors: {
      neutral400: string;
      primary600: string;
    };
  }
}

type TProps = InputProps &
  FieldValue & {
    labelAction?: React.ReactNode;
  };

const ActionWrapper = styled.div`
  display: flex;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  button:hover svg path {
    fill: ${({ theme }) => theme.colors.primary600};
  }
`;

const Input = React.forwardRef<HTMLInputElement, TProps>(
  (
    {
      hint,
      disabled = false,
      labelAction,
      label,
      name,
      required = false,
      onChange,
      value,
      error,
      placeholder,
    },
    forwardedRef
  ) => {
    const { formatMessage } = useIntl();
    const fieldRef = useFocusInputField<HTMLInputElement>(name);
    const composedRefs = useComposedRefs(forwardedRef, fieldRef);

    const generateHex = () => {
      const characters = '0123456789abcdef';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
      }
      onChange({ target: { value: result, name } } as React.ChangeEvent<HTMLInputElement>);
    };

    const copyToClipboard = async () => {
      try {
        if (value) {
          await navigator.clipboard.writeText(value);
        }
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
    };

    return (
      <Field.Root name={name} id={name} error={error} hint={hint} required={required}>
        <Field.Label action={labelAction}>{label}</Field.Label>

        <TextInput
          ref={composedRefs}
          aria-label={formatMessage({
            id: 'hex.form.label',
            defaultMessage: 'Hex Code Generator',
          })}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          endAction={
            <ActionWrapper>
              <button type="button" aria-label="Generate" onClick={generateHex}>
                <ArrowClockwise />
              </button>
              <button type="button" aria-label="Copy" onClick={copyToClipboard}>
                <Duplicate />
              </button>
            </ActionWrapper>
          }
        />

        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  }
);

export default Input;
