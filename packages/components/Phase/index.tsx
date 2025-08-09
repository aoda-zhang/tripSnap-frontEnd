import { FC, ReactNode } from 'react';

import styles from './index.module.css';

interface SectionType {
  label: string | ReactNode;
  value: string | ReactNode;
}

interface Props {
  title?: string | ReactNode;
  sections: SectionType[];
}

const Phase: FC<Props> = (props) => {
  const { title, sections } = props;
  return (
    <div className={styles.phase}>
      {title && <p className={styles.title}>{title}</p>}
      {sections?.map((section, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={idx} className={styles.section}>
          <span className={styles.label}>{section.label}</span>
          <span> {section.value}</span>
        </p>
      ))}
    </div>
  );
};
export default Phase;
