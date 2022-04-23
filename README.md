# Front-end - Test Task

## Requirements

-
- Test task should be stored on GitHub or BitBucket and a link or invitation should be sent to [denis@unionf`intech.com](mailto:denis@unionfintech.com).

## Application architecture requirements

Engine version:

- Node 17+

Programming language:

- Typescript

Libraries/Frameworks:

- React with Hooks
- Redux RTK query
- React Hook Form (https://react-hook-form.com/) + yup for form validation (https://github.com/jquense/yup)

UI library:

- Material UI

Mock Server (for form post):

- json-server (or any other)

### Application functional requirements

Create a simple modal, based on the design (!!!Red blocks only!!!).



**The flow**, open modal by pressing the button. Modal has fields without data. Fields should be validated before posting the form. All fields all mandatory (avatar also and file). Post the form to Json-server, close popap and show success modal/dialog for the users. If something went wrong - show error over the main modal and let user re-post form or cancel (for example mock server was turned off).



In dynamic arrays there should be at least one element (1...n number of elements), but one is mandatory to have (Lähedased - Relatives, Laps - Child).



Please use correct Yup validation schema.

Example (just an example, but there is an error in schema, so you could use @ts-ignore if needed):

```
// @ts-ignore regression bug in 0.32.9 https://github.com/jquense/yup/issues/1389
const schema: SchemaOf<Omit<Game, 'id' | 'active' | 'created'>> = object({
  gameId: string()
    .required('Game id is required')
    .max(24, 'Game id must be between 1 and 24 characters long')
    .matches(/^[a-zA-Z\d-]+$/, 'Only letters, numbers and hyphen (-) characters allowed'),
  name: string()
    .required('Name is required')
    .max(24, 'Name must be between 1 and 24 characters long')
    .matches(/^[a-zA-Z\d &:,`!+-]+$/),
  studioId: number().required('Studio is required'),
  partnerId: number().required('Partner is required'),
  categories: array().required('Pick at least one category').min(1, 'Pick at least one category'),
  active: boolean(),
  bets: array()
    .required('Bets are required')
    .length(2)
    .of<SchemaOf<GameBet>>(
      object({
        currency: mixed<Currency>().oneOf(Object.values(Currency)).required(),
   })
});
```

#### Notes:

* There is an fieldArray in react-hook-from to use with dynamic arrays - https://react-hook-form.com/api/usefieldarray/#main

* Json server should be deadly simple and only for posting form data, so - [GitHub - typicode/json-server: Get a full fake REST API with zero coding in less than 30 seconds (seriously)](https://github.com/typicode/json-server#getting-started)

#### Translations:

Isikuandmete muutmine - Changing personal data  (in your case would be Create personal data)

Kinni -  Close

Täiendamisel - In progress

Isikuandmed - Personal data

Haridus - Education

Muu - Other

Kontaktandmed - Contact details

Telefoninumber - Telephone number

Lisa veel - Add more

E-post - E-mail

Pangaandmed - Bank details

Saja nimi - Name of recipient

Arvelduskonto nr - Current account number

Foto - Photo

Isiku foto heledal taustal - Photo of person on light background

Vaheta pilt - Change image (In your case would be 'Add picture')

Laps 1 - Child 1

Täisnimi - Full name

Sünniaeg - Date of birth

Vanus - Age

Eemalda - Remove

Lisa fail manusse - Add file to attachment

Lisage palun skaneeritud sünnitõendi koopia - Please attach a scanned copy of the birth certificate

Lisa laps - Add child

Lähedane 1 - Relative 1

Lähedase liik (Abikaasa, Muu) - Type of relative (Spouse, Other)

Isikukood või sünniaeg - Identity code or date of birth

Telefoninumber - Telephone number

E-post - E-mail

Kontaktisik eriolukorras - Contact person in case of emergency

Lisa lähedast - Add a loved one