import * as Mui from "@mui/material"
import { useAppSelector } from "../hooks"
import type { Archetype, Form, Hero, Style } from "../types"
import { HeroType } from "../types"
import type { ReactNode, SyntheticEvent } from "react"
import { useState } from "react"
import { ActionDisplay } from "./Action"
import { defaultArchetype } from "../textContent"
import { StyleDisplay } from "./Style"
import { FormDisplay } from "./Form"

interface TabPanelProps {
  children?: ReactNode
  index: number
  selectedTab: number
}

const TabPanel = ({ children, index, selectedTab }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={selectedTab !== index}>
      {children}
    </div>
  )
}

const StancesTabs = ({ hero }: { hero: Hero }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }
  const stances = [
    {
      style: hero.style1,
      form: hero.form1,
      name: `${hero.style1.name} ${hero.form1.name}`,
    },
    {
      style: hero.style2,
      form: hero.form2,
      name: `${hero.style2.name} ${hero.form2.name}`,
    },
    {
      style: hero.style3,
      form: hero.form3,
      name: `${hero.style3.name} ${hero.form3.name}`,
    },
  ]
  return (
    <Mui.Card>
      <Mui.Tabs value={selectedTab} onChange={handleChangeTab}>
        {stances.map(s => (
          <Mui.Tab label={s.name} />
        ))}
      </Mui.Tabs>
      {stances.map((s, i) => (
        <TabPanel index={i} selectedTab={selectedTab}>
          <Mui.Grid container>
            <StyleDisplay style={s.style} width={6} />
            <FormDisplay form={s.form} width={6} />
          </Mui.Grid>
          <Mui.Stack spacing={1}>
            {[...s.form.actions, ...s.style.actions].map(action => (
              <ActionDisplay action={action} />
            ))}
          </Mui.Stack>
        </TabPanel>
      ))}
    </Mui.Card>
  )
}

const FranticTabs = ({ hero }: { hero: Hero }) => {
  const [selectedFormTab, setSelectedFormTab] = useState(0)
  const handleChangeFormTab = (event: SyntheticEvent, newValue: number) => {
    setSelectedFormTab(newValue)
  }
  const [selectedStyleTab, setSelectedStyleTab] = useState(0)
  const handleChangeStyleTab = (event: SyntheticEvent, newValue: number) => {
    setSelectedStyleTab(newValue)
  }

  const activeForms = [hero.form1, hero.form2, hero.form3]
  const activeStyles = [hero.style1, hero.style2, hero.style3]

  return (
    <Mui.Card>
      {/* styles */}
      <Mui.Tabs value={selectedStyleTab} onChange={handleChangeStyleTab}>
        {activeStyles.map(style => (
          <Mui.Tab label={style.name} />
        ))}
      </Mui.Tabs>
      {activeStyles.map((style, i) => (
        <TabPanel index={i} selectedTab={selectedStyleTab}>
          <StyleDisplay style={style} width={12} />
          <Mui.Stack spacing={1}>
            {style.actions.map(action => <ActionDisplay action={action} />)}
          </Mui.Stack>
        </TabPanel>
      ))}
      {/* forms */}
      <Mui.Tabs value={selectedFormTab} onChange={handleChangeFormTab}>
        {activeForms.map(form => (
          <Mui.Tab label={form.name} />
        ))}
      </Mui.Tabs>
      {activeForms.map((form, i) => (
        <TabPanel index={i} selectedTab={selectedFormTab}>
          <FormDisplay form={form} width={12} />
          <Mui.Stack spacing={1}>
            {form.actions.map(action => <ActionDisplay action={action} />)}
          </Mui.Stack>
        </TabPanel>
      ))}

    </Mui.Card>
  )
}
export const CurrentHero = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const activeArchetypes = [
    hero.archetype1,
    hero.archetype2,
    hero.archetype3,
  ].filter(arch => arch !== defaultArchetype)
  const descriptionForArch = (hero: Hero, arch: Archetype) => {
    switch (hero.type) {
      case HeroType.Focused:
        return arch.focusedAbility.description
      case HeroType.Fused:
        return arch.fusedAbility.description
      case HeroType.Frantic:
        return arch.franticAbility.description
    }
  }
  return (
    <Mui.Grid item xs={6}>
      <h2>Stances/Unique Actions</h2>
      <Mui.Stack spacing={1}>
        <Mui.Card>
          <strong>{hero.build.name}</strong>: {hero.build.description}
        </Mui.Card>
        {activeArchetypes.map(arch => (
          <Mui.Card>
            <strong>{arch.name}</strong>: {descriptionForArch(hero, arch)}
          </Mui.Card>
        ))}
        {hero.type === HeroType.Frantic ? (
          <FranticTabs hero={hero} />
        ) : (
          <StancesTabs hero={hero} />
        )}
      </Mui.Stack>
    </Mui.Grid>
  )
}
