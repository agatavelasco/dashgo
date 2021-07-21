import { Flex, Button, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'

export default function SignIn() {
  const { register, handleSubmit } = useForm()

  function handleSignIn(values) {
    console.log(values);
  }

  return (
    
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >

      <Flex 
        as='form'
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
      

      <Stack spacing="4">

        <Input name="email" type="email" label="E-mail" {...register('email')} />
        <Input name="password" type="password" label="Senha" {...register('password')} />
        
      </Stack>
        <Button type="submit" colorScheme="pink" mt="6" size="lg">Entrar</Button>
      </Flex>
    </Flex>
  )
}
