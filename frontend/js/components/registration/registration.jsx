import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { isEmpty } from 'lodash';

export const registration = () => {


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