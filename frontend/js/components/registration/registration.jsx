import { useRouter } from 'next/router';
import { useState } from 'react';
import { noop } from 'lodash';
import { form as Form } from 'modules/form';
import { generateOTPMutation } from 'mutations/generateOTP';
import { registerMutation } from 'mutations/register';
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';


const getSteps = ( { goBack = noop } = {} ) => {
  return [ {
  fields: [ {
    name: 'name',
    type: 'text',
    required: true,
    placeholder: 'Enter Name',
  }, {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Enter Email',
  }, {
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
    type: 'submit',
    label: 'Send OTP'
  } ],
  title: 'Register',
  subtitle: 'Enter the email address that you want to associate with your account'
}, {
  fields: [ {
    name: 'otp',
    type: 'text',
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
  title: 'Register',
  subtitle: 'Please enter the OTP sent on your email address associated with your account'
} ];
};


export const registration = () => {

    const [ serverResponse, setServerResponse ] = useState( { status: '', msg: '' } );

    const [ activeStepIndex, setActiveStepIndex ] = useState( 0 );
    const [ selectedValues, setSelectedValues ] = useState( {} );

    const [ generateOTP, { loading } ] = useMutation( generateOTPMutation );
    const [ registerUser, { loading: registeringUser } ] = useMutation( registerMutation );

    const client = useApolloClient();

    const router = useRouter();


    const onSubmit = ( payload ) => {

      if( 0 === activeStepIndex ) {

        if( payload.password !== payload.confirmPassword ) {
          setServerResponse( { status: 'error', msg: 'Password\'s does not match' } );
        } else {
          setServerResponse( { status: '', msg: '' } );
          setSelectedValues( {
            ...selectedValues,
            ...payload
          } );
          handleGenerateOTP( payload );
        }
      } else {
        setServerResponse( { status: '', msg: '' } );
        handleRegistrationSubmit( payload );
      }
      
    };

    const handleGenerateOTP = async ( payload ) => {
      
      const { data } = await generateOTP( {
        variables: {
          email: payload.email,
          newUser: true
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

    const handleRegistrationSubmit = async ( payload ) => {
      
      const { data } = await registerUser( {
        variables: {
          ...selectedValues,
          otp: payload.otp
        }
      } );

      const { msg, status, token } = data.register;

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
    };

    const stepPayload = getSteps( { goBack } )[ activeStepIndex ];

    return (
      <div className = 'registration' >
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