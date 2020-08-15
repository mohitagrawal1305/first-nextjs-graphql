import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { isEmpty } from 'lodash';
import { checkIfLoggedIn } from 'hooks/checkIfLoggedIn';

export const registration = () => {

    checkIfLoggedIn( { isPrivateRoute: false } );

    const [ errorMessage, setErrorMessage ] = useState( '' );



    return (
      <div className = 'registration' >
          {
            !isEmpty( errorMessage ) && (
              <Alert severity="error">
                { errorMessage }
              </Alert>
            )
          }

      </div>
    )
}