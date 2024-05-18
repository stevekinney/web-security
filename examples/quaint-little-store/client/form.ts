type Data = { [key: string]: FormDataEntryValue };
type SuccessCallback = ({ data }: { data: Data }) => void;
type ErrorCallback = (error: string) => void;

type Callbacks = Partial<{
  success: SuccessCallback;
  error: ErrorCallback;
}>;

export const enhanceForm = (
  form: HTMLFormElement,
  { success, error }: Callbacks = {},
  method: 'PUT' | 'PATCH' | 'DELETE' = 'PATCH'
) => {
  success = success || (() => {});
  error = error || (() => {});

  if (!form) {
    console.error('Form not found.');
    return;
  }

  form.addEventListener('submit', async (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data: Data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      const response = await fetch(form.action, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        success({ data });
      } else {
        error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  });
};
