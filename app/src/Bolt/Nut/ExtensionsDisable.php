<?php

namespace Bolt\Nut;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ExtensionsDisable extends BaseCommand
{
    protected function configure()
    {
        $this
            ->setName('extensions:disable')
            ->setDescription('Disables an extension.')
            ->addArgument('name', InputArgument::REQUIRED, 'Name of the extension to uninstall');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $name = $input->getArgument('name');
        $result = $this->app['extend.runner']->uninstall($name);
        $output->writeln($result);
    }
}
