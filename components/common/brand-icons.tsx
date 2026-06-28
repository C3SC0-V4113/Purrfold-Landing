import { IconBrandGithub, IconBrandLinkedin, IconCat, type IconProps } from '@tabler/icons-react';

type BrandIconProps = Omit<IconProps, 'ref'>;

export function GitHubIcon(props: BrandIconProps) {
  return <IconBrandGithub stroke={1.8} {...props} />;
}

export function LinkedInIcon(props: BrandIconProps) {
  return <IconBrandLinkedin stroke={1.8} {...props} />;
}

export function PurrfoldCatIcon(props: BrandIconProps) {
  return <IconCat stroke={1.8} {...props} />;
}
