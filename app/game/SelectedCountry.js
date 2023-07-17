export default function SelectedCountry({ selected }) {
  return (
    <>
      <img src={selected?.flags?.png} />
    </>
  );
}
