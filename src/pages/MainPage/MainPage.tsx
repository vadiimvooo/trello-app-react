import s from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <>
      <h1 className={s.mainPageWelcomeTitle}>Welcome to our management app</h1>
      <h2 className={s.mainPageInstructionTitle}>You can start work by entering tasks page</h2>
    </>
  );
};
