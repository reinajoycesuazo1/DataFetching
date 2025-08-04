import ProductsList from "@/components/ProductsList";
import { DataContext, DataProvider } from "@/context/DataContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const AppContent: React.FC = () => {
  const { products, setProducts } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data;
      setProducts(data.products || []);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleHomePress = () => {
    setSearchQuery("");
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ProductsList 
        products={filteredProducts} 
        loading={loading} 
        error={error}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHomePress={handleHomePress}
      />
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
});
