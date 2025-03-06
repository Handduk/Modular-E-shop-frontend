import { useSearchParams } from 'react-router-dom';

export const useURLId = () => {
  const [searchParam] = useSearchParams();
  const idString = searchParam.get("id");
    const id = idString ? parseInt(idString) : 0;
  return { id };
}