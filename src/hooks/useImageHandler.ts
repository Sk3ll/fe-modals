import { ChangeEvent, useState } from 'react';

export default () => {
  const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const [image, setImage] = useState<string>(defaultImage);

  const imageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && !!reader.readyState) {
        setImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(event.target!.files![event.target!.files!.length - 1]);
  };

  return { image, imageHandler };
};
