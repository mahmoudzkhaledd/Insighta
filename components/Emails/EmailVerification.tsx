"use server";
import { siteConfig } from "@/constants/site";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface EmailVerificationProps {
  userName: string;

  magicLink: string;
}

const baseUrl = process.env.URL ?? "";

export const VerificationEmailComponent = (props: EmailVerificationProps) => {
  const previewText = `Confirm your email`;
  const { userName, magicLink } = props
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/favicon.ico`}
                width="40"
                height="37"
                alt="Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>{userName}</strong> on <strong>Vercel</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Dear <strong>{userName}</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for signing up with us! To complete the registration process and activate your new account, please click on the following link:
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                href={magicLink}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              >
                Confirm email
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              By clicking this link, you verify that the email address provided during registration is yours. This step helps us ensure the security of your account and allows us to communicate important updates and information to you.
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not create an account with us or did not request this verification, please disregard this email.

              Thank you for choosing us. We look forward to serving you!

              Best regards,
              {siteConfig.name} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};



export default VerificationEmailComponent;