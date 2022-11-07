import React, { useMemo, useState, useTransition } from 'react';

import InputField from '../ui/InputField';
import Spinner from '../ui/Spinner';

const Suggester = ({ list, id }) => {
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();
  const bigList = useMemo(() => list.filter(item => name !== '' && item.nickName.includes(name)), [name, list]);

  const handleChange = event => {
    startTransition(() => {
      setName(event.target.value);
    });
  };

  return (
    <>
      <InputField id={`${id}-suggester`} name="suggester" label="Suggester" value={name} onChange={handleChange} />
      {isPending ? (
        <Spinner />
      ) : (
        <ol>
          {bigList.map(item => (
            <li key={item.createdAt}>{item.nickName}</li>
          ))}
        </ol>
      )}
    </>
  );
};

export default Suggester;
