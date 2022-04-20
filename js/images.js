const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatarContainer = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');
const fileChooserPhotosContainer = document.querySelector('.ad-form__input');
const previewPhotosContainer = document.querySelector('.ad-form__photo');

// Загрузка и предпросмотр аватарки.

document.querySelector('.ad-form-header__preview').style.justifyContent = 'center';

fileChooserAvatarContainer.addEventListener('change', () => {

  const file = fileChooserAvatarContainer.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {

    previewAvatar.style.width = '70px';
    previewAvatar.style.height = '70px';
    previewAvatar.src = URL.createObjectURL(file);
  }
});

// Загрузка и предпросмотр фотографии жилья.

fileChooserPhotosContainer.addEventListener('change', () => {

  const file = fileChooserPhotosContainer.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhotosContainer.innerHTML = '';
    const previewPhoto = document.createElement('img');

    previewPhoto.alt = 'Фотография жилья.';
    previewPhoto.style.width = '70px';
    previewPhoto.style.height = '70px';
    previewPhoto.src = URL.createObjectURL(file);
    previewPhotosContainer.append(previewPhoto);
  }
});

// Сброс фото

const resetPreviewImage = () => {
  previewAvatar.style.width = '40px';
  previewAvatar.style.height = '44px';
  previewAvatar.src = 'img/muffin-grey.svg';

  previewPhotosContainer.innerHTML = '';
};

export {resetPreviewImage};
