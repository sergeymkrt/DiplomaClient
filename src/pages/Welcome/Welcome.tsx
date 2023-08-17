import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

import { Button } from '@/components/ui/button';

function Welcome() {
  const isPortrait = useOrientation();

  return (
    <>
      <Meta title="Welcome" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        <Button className="text-zinc-300 dark:bg-white">Test</Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Welcome;
