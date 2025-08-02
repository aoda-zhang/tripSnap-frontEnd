// The function is get icon from lucide-react
// The parameter name MUST be from lucide-react
// e.g.  import { Camera } from 'lucide-react';  the name should be Camera
import * as Icons from 'lucide-react';
import { FC } from 'react';

const getIconByName = (name: string): FC<any> | undefined => {
  return (Icons as unknown as Record<string, FC<any>>)[name];
};

export default getIconByName;
