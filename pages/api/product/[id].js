export default async (req, res) => {
    const {
      query: { id },
    } = req
  
    res.end(`Post: ${pid}`)
}