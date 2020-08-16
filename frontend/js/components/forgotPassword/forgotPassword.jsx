import { useRouter } from 'next/router';
import { useState } from 'react';
import { noop } from 'lodash';
import { form as Form } from 'modules/form';
import { generateOTPMutation } from 'mutations/generateOTP';
import { resetPasswordMutation } from 'mutations/resetPassword';
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

const getSteps = ( { goBack = noop } = {} ) => {
  return [ {
  fields: [ {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Enter Email',
  } ],
  actions: [ {
    type: 'submit',
    label: 'Send OTP'
  } ],
  title: 'Forgot Password?',
  subtitle: 'Enter the email address associated with your account'
}, {
  fields: [ {
    name: 'otp',
    type: 'number',
    required: true,
    placeholder: 'Enter OTP',
  } ],
  actions: [ {
    type: 'button',
    label: 'Previous',
    onClick: goBack
  }, {
    type: 'submit',
    label: 'Submit'
  } ],
  title: 'Forgot Password?',
  subtitle: 'Please enter the OTP sent on your email address associated with your account'
}, {
  fields: [ {
    name: 'password',
    type: 'password',
    required: true,
    placeholder: 'Enter Password',
  }, {
    name: 'confirmPassword',
    type: 'password',
    required: true,
    placeholder: 'Confirm Password',
  } ],
  actions: [ {
    type: 'button',
    label: 'Previous',
    onClick: goBack
  }, {
    type: 'submit',
    label: 'Submit'
  } ],
  title: 'Forgot Password?',
  subtitle: 'Add new Password'
} ];
};


export const forgotPassword = () => {

    const [ serverResponse, setServerResponse ] = useState( { status: '', msg: '' } );

    const [ activeStepIndex, setActiveStepIndex ] = useState( 0 );
    const [ selectedValues, setSelectedValues ] = useState( {} );

    const [ generateOTP, { loading } ] = useMutation( generateOTPMutation );
    const [ resetPassword, { loading: registeringUser } ] = useMutation( resetPasswordMutation );

    const client = useApolloClient();

    const router = useRouter();


    const onSubmit = ( payload ) => {

      if( 0 === activeStepIndex ) {
          setServerResponse( { status: '', msg: '' } );
          setSelectedValues( {
            ...selectedValues,
            ...payload
          } );
          handleGenerateOTP( payload );
      } else if( 1 === activeStepIndex ) {
        setServerResponse( { status: '', msg: '' } );
        setSelectedValues( {
          ...selectedValues,
          ...payload
        } );
        setActiveStepIndex( activeStepIndex + 1 );
      } else {
        setServerResponse( { status: '', msg: '' } );
        if( payload.password !== payload.confirmPassword ) {
          setServerResponse( { status: 'error', msg: 'Password\'s does not match' } );
        } else {
          handleResetPasswordSubmit( payload );
        }
      }
      
    };

    const handleGenerateOTP = async ( payload ) => {
      
      const { data } = await generateOTP( {
        variables: {
          email: payload.email,
          newUser: false
        }
      } );

      const { msg, status } = data.generateOTP;

      if( 'success' === status ) {
        setActiveStepIndex( 1 );
      } else {
        setServerResponse( {
          msg,
          status
        } );

      }
    };

    const handleResetPasswordSubmit = async ( payload ) => {
      
      const { data } = await resetPassword( {
        variables: {
          ...selectedValues,
          ...payload
        }
      } );

      const { msg, status, token } = data.resetPassword;

      if( 'success' === status && token ) {

          document.cookie = `token=${token}`;
      
          client.resetStore();

          router.push('/');
      } else {
        setServerResponse( {
          msg,
          status
        } );

      }
    };

    const goBack = () => {
      setActiveStepIndex( activeStepIndex - 1 );
      setServerResponse( { status: '', msg: '' } );
    };

    const stepPayload = getSteps( { goBack } )[ activeStepIndex ];

    return (
      <div className = 'forgot-password' >
          <Form
            key = { activeStepIndex }
            { ...stepPayload }
            onSubmit = { onSubmit }
            selectedValues = { selectedValues }
            loading = { loading || registeringUser }
            { ...serverResponse }
          />

      </div>
    )
}