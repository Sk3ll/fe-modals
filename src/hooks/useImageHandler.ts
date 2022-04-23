import { ChangeEvent, useState } from 'react';

export default () => {
  const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const [image, setImage] = useState<string>(defaultImage);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && reader.readyState === 2) {
        setImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(e.target!.files![0]);
  };

  return { image, imageHandler };
};
