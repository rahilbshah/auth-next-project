'use client';

import { useCallback, useEffect, useState } from 'react';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { CardWrapper } from './card-wrapper';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { newVerification } from '@/actions/new-verification';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [verificationAttempted, setVerificationAttempted] =
    useState<boolean>(false); // New state to track verification attempt
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (verificationAttempted || success || error) return;
    if (!token) {
      setError('Missing token!');
      return;
    }

    newVerification(token)
      .then(data => {
        setVerificationAttempted(true);
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error, verificationAttempted]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit, verificationAttempted]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
