const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.post('/items', async (req, res) => {
  const { nama_pemilik, jenis_sepatu, status = 'Diterima' } = req.body;
  if (!nama_pemilik || !jenis_sepatu) {
    return res.status(400).json({ error: 'nama_pemilik dan jenis_sepatu wajib diisi' });
  }
  const { data, error } = await supabase
    .from('items')
    .insert([{ nama_pemilik, jenis_sepatu, status }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.get('/items', async (req, res) => {
  const { status } = req.query;
  let query = supabase.from('items').select('*');
  if (status) {
    query = query.eq('status', status);
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return res.status(404).json({ error: 'Item tidak ditemukan' });
  res.json(data);
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase
    .from('items')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  if (data.length === 0) return res.status(404).json({ error: 'Item tidak ditemukan' });
  res.json(data[0]);
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Item berhasil dihapus' });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Layanan Cuci Sepatu siap digunakan!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});


module.exports = app;
