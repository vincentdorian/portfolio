import z, {ZodError} from "zod"
import sg from "@sendgrid/mail"

sg.setApiKey(process.env.SENDGRID_API_KEY)

export default async (request, response) => {
  let { data } = await request.body

  let formSchema = z.object({
    name: z.string().min(3, 'Name must bei min. 3 chars long'),
    email: z.string().email(),
    message: z.string().min(10)
  })

  let {success, error} = formSchema.safeParse(data)

  if(!success){
    return response.status(400).json(error.flatten())
  }

  const msg = {
    to: 'hi@vincentdorian.me',
    from: 'hi@vincentdorian.me', // Use the email address or domain you verified above
    subject: `New Message from ${data.name} - ${data.email}`,
    text: `${data.message}`,
  };

  sg.send(msg).then(() => {
    return response.status(200).json({success: true})
  }).catch((error) => {
    return response.status(200).json({error: JSON.stringify(error)})
  })

};

