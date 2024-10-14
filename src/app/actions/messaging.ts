'use server';
import { sendMessageSchema } from '@/lib/form-schema/auth';
import { PrevStateProps } from './auth';
import { getTokens, http } from './httpConfig';

export interface SendMessageState extends PrevStateProps {
  errors?: {
    userType?: string[];
    file?: string[];
    message?: string[];
    messageType?: string[];
  };
}

export async function sendMessage(
  prevState: SendMessageState | undefined,
  formData: FormData
) {
  // console.log('clicked');
  const { access_token } = await getTokens();
  const data = Object.fromEntries(formData.entries());
  // console.log(formData);
  const validatedFields = sendMessageSchema.safeParse(data);
  // console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      message: 'Validation Failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      status: 'failed',
    };
  }
  // console.log(validatedFields.success);
  //data to submit to database
  const dataToSubmit = validatedFields.data;
  const dataToSend = new FormData();

  dataToSend.append('userType', dataToSubmit.userType);
  dataToSend.append('messageType', dataToSubmit.messageType);
  dataToSend.append('message', dataToSubmit.message);
  if (dataToSubmit.file) {
    dataToSend.append('file', dataToSubmit.file);
  }

  try {
    // console.log(dataToSubmit);
    const response = await fetch(
      'https://api.instantotp.com/api/admin/messaging',
      {
        method: 'POST',
        body: dataToSend,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { ...prevState, message: data, status: 'failed' };
    }

    return {
      ...prevState,
      message: data,
      status: 'success',
    };
  } catch (error) {
    if (error) {
      // console.log(error);
      return {
        message: 'Failed to send',
        status: 'failed',
      };
    }
  }
}

export async function fakesendMessage(dataToSend: any) {
  try {
    const response = await http('/messaging', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
      return { message: data, status: 'failed' };
    }
    // console.log(data);
    // revalidateTag('allProviders');

    return {
      message: 'Message sent.',
      status: 'success',
    };
  } catch (error) {
    if (error) {
      return {
        message: 'Failed to send',
        status: 'failed',
      };
    }
  }
}
