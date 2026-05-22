import { useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ALL_FILTERS, type Filter } from "./data/filters";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { memo, useCallback, useEffect } from "react";

type FormValues = { selectedTags: string[] };
type TagChipProps = {
  filter: Filter;
  selected: boolean;
  onPress: () => void;
};
type TagChipMemoProps = {
  filter: Filter;
  selected: boolean;
  toggle: (id: string) => void;
};


export const Filters = () => {
  const { watch, setValue, getValues } = useForm<FormValues>({
    defaultValues: { selectedTags: [] },
  });

  const selectedTags = watch("selectedTags");

  const toggle = useCallback((tag: string) => {
    const selectedTags = getValues('selectedTags');
    if (selectedTags.includes(tag)) {
      setValue(
        "selectedTags",
        selectedTags.filter((t) => t !== tag),
      );
    } else {
      setValue("selectedTags", [...selectedTags, tag]);
    }
  }, [getValues, setValue]);


  return (
    
    <SafeAreaInsetsContext.Consumer>
          {insets =>  <View style={{ ...styles.container, paddingTop: insets?.top ?? 0 }}>
        <Text style={styles.header}>Filter movies</Text>
        <Text style={styles.subheader}>{selectedTags.length} selected</Text>
        <ScrollView contentContainerStyle={styles.chipContainer}>
          {ALL_FILTERS.map((filter) => (
              <TagChipMemo
                key={filter.id}
                filter={filter}
                selected={selectedTags.includes(filter.id)}
                toggle={toggle}
              />
            ))}
        </ScrollView>
      </View>
      }
    </SafeAreaInsetsContext.Consumer>
  );
};

const TagChip = ({ filter, selected, onPress }: TagChipProps) => {
  return (
  <Pressable
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}
  >
    <Text style={styles.chipIcon}>{filter.icon}</Text>
    <View style={styles.chipTextStack}>
      <Text style={selected ? styles.chipTextSelected : styles.chipText}>
        {filter.label}
      </Text>
      <Text
        style={selected ? styles.chipCategorySelected : styles.chipCategory}
      >
        {filter.category}
      </Text>
    </View>
  </Pressable>
)};

const TagChipMemo = memo(({ filter, selected, toggle }: TagChipMemoProps)=>{
  return (
            <TagChip
              key={filter.id}
              filter={filter}
              selected={selected}
              onPress={() => toggle(filter.id)}
            />
          );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    alignSelf: "center",
    color: "#666",
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 16,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#fafafa",
    borderWidth: 1.5,
    borderColor: "#d4d4d4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  chipSelected: {
    backgroundColor: "#1a1a1a",
    borderColor: "#1a1a1a",
    shadowColor: "#1a1a1a",
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  chipIcon: {
    fontSize: 14,
  },
  chipTextStack: {
    flexDirection: "column",
  },
  chipText: {
    color: "#1a1a1a",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  chipCategory: {
    color: "#888",
    fontSize: 10,
  },
  chipCategorySelected: {
    color: "#bbb",
    fontSize: 10,
  },
});
