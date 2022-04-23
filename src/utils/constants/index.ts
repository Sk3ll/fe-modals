export enum Header {
  Title = 'Create Personal Data',
  PersonalData = 'Personal Data',
  Education = 'Education',
  Other = 'Other',
  Status = 'In progress',
}

export enum Buttons {
  Close = 'Close',
  Remove = 'Remove',
  Cancel = 'Cancel',
  Save = 'Save and continue',
  AddMore = 'Add more',
  AddPicture = 'Add picture',
  AddFile = 'Add file to attachment',
  AddChild = 'Add child',
  AddLoved = 'Add a loved one',
  AgreeCheckbox = 'I agree with displaying the image on an external website',
  EmergencyCheckbox = 'Contact person in case of emergency',
}

export enum ContactDetails {
  Title = 'Contact Details',
  Phone = 'Telephone number',
  Bank = 'Bank details',
  AccountNumber = 'Current account number',
  Photo = 'Photo',
  PhotoDescription = 'Photo of person on light background',
  Name = 'Name of recipient',
  Email = 'E-mail',
}

export enum Child {
  Title = 'Child',
  FullName = 'Full name',
  DateOfBirth = 'Date of birth',
  Age = 'Age',
}

export enum Relative {
  Title = 'Relative',
  Type = 'Type of relative (Spouse, Other)',
  FullName = 'Full name',
  CodeOrDob = 'Identity code or date of birth',
  Email = 'E-mail',
  Phone = 'Telephone number',
}

export const BACKEND_API_URL = 'http://localhost:8080/';
